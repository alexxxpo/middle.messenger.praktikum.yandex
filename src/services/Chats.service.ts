import ChatsApi from "../api/Chats.api";

const chatsApi = new ChatsApi();

export const loadChats = async ( ) => {
    window.store.set({isLoading: true});
    try {
        const chats = await chatsApi.getChats();
        window.store.set({chats});
        
    } catch (error) {
        window.store.set({loginError: 'some error'});
    } finally {
        window.store.set({isLoading: false});
    }

}


// export const setActiveCatCard = (card) => {
//     window.store.set({selectedCard: card});
// }
