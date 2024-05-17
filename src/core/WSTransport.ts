import EventBus from "./EventBus"

enum WSTransportEvents {
	Error = 'error',
	Connected = 'connected',
	Close = 'close',
	Message = 'message'
}


export class WSTransport extends EventBus {

	private socket?: WebSocket
	private pingInterval?: ReturnType<typeof setInterval>
	private readonly pingIntervalTime = 30000
	private url: string

	constructor(url: string) {
		super()
		this.url = url
	}

	public connect(uid: number, chatId: number, token: string): Promise<void> {

		if (this.socket) {
			throw new Error('The socket already connected')
		}

		this.socket = new WebSocket(this.url + `/${uid}/${chatId}/${token}`)
		this.subscribe(this.socket)
		this.setupPing()


		return new Promise((resolve, reject) => {
			this.on(WSTransportEvents.Error, reject);
			this.on(WSTransportEvents.Connected, () => {
				this.off(WSTransportEvents.Error, reject)
				resolve()
			})
		})
	}
	public send(data: string | number | object) {
		if(!this.socket) {
			throw new Error('Socket is not connected')
		}
		this.socket.send(JSON.stringify(data))
	}

	public close() {
		this.socket?.close()
	}

	private subscribe(socket: WebSocket) {
		socket.addEventListener('open', () => {
			this.emit(WSTransportEvents.Connected)
		})
		socket.addEventListener('close', () => {
			this.emit(WSTransportEvents.Close)
		})
		socket.addEventListener('error', (e) => {
			this.emit(WSTransportEvents.Error, e)
		})
		socket.addEventListener('message', (message) => {
			try {
				const data = JSON.parse(message.data)
				if(['pong', 'user connected'].includes(data?.type)) {
					return
				}
				this.emit(WSTransportEvents.Message, data)
			} catch(e) {
				console.error(e);				
			}
		})
	}

	private setupPing() {
		this.pingInterval = setInterval(() => {
			this.send({ type: 'ping' })
		}, this.pingIntervalTime)

		this.on(WSTransportEvents.Close, () => {
			clearInterval(this.pingInterval)
			this.pingInterval = undefined
		})
	}
}
