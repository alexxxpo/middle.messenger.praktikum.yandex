import { Block } from "../../core";
import {
  addUserToChat,
  changeChatImage,
  deleteChat,
  deleteUserFromChat,
} from "../../services/Chats.service";
import { searchUsersByLogin } from "../../services/Users.service";
import {
  ChatsResponse,
  CreateChatResponse,
  FindUserRequest,
  UserResponse,
} from "../../types/types";
import { getModel } from "../../utils/LogFormFields";
import { MapStateToProps, connect } from "../../utils/connect";
import { ButtonAddUser } from "../ButtonAddUser";
import { ButtonDeleteUser } from "../ButtonDeleteUser";
import { Popup } from "../Popup";
import { PopupAdd } from "../PopupAdd";

type ChatsControlButtonsProps = {
  usersSearch: UserResponse[];
  activeChat: ChatsResponse | null;
  isLoading: boolean;
  showPopupAdd: boolean;
  showPopupDelete: boolean;
  selectedUser: UserResponse;
};

class ChatsControlButtons extends Block<ChatsControlButtonsProps> {
  showPopup: boolean;
  showPopupChangeChatImage: boolean;

  constructor(props: ChatsControlButtonsProps) {
    super({
      ...props,
    });
    this.showPopup = false;
    this.showPopupChangeChatImage = false;
  }

  init() {
    // Handlers
    const closePopup = (e: Event) => {
      e.stopPropagation();
      if (
        e.target === this.children.popupAddUser.getElement() ||
        e.target === this.children.popupDeleteUser.getElement()
      ) {
        this.setProps({ showPopupAdd: false, showPopupDelete: false });
      }
	  if (
        e.target === this.children.popupChangeChatImage.getElement()
      ) {
        this.setProps({ showPopupChangeChatImage: false });
      }
    };
    const closePopupBind = closePopup.bind(this);

    const searchUser = (e: Event) => {
      searchUsersByLogin(getModel(e) as FindUserRequest);
    };

    const addUser = async (e: Event) => {
      e.preventDefault();
      const model = getModel(e);
      const selectedUser =
        this.props.usersSearch.filter((i) => i.login === model.login)[0] || {};
      this.setProps({
        selectedUser,
      });
      if (this.props.selectedUser.id !== undefined) {
        const model = {
          users: [this.props.selectedUser?.id],
          chatId: this.props.activeChat?.id,
        };
        if (model.chatId !== undefined) {
          await addUserToChat({
            users: [this.props.selectedUser?.id],
            chatId: this.props.activeChat?.id || 0,
          });
        }
        this.setProps({ showPopup: false });
      }
    };

    const deleteUser = async (e: Event) => {
      e.preventDefault();
      const model = getModel(e);
      const selectedUser =
        this.props.usersSearch.filter((i) => i.login === model.login)[0] || {};
      this.setProps({
        selectedUser,
      });
      if (this.props.selectedUser.id !== undefined) {
        const model = {
          users: [this.props.selectedUser?.id],
          chatId: this.props.activeChat?.id,
        };
        if (model.chatId !== undefined) {
          await deleteUserFromChat({
            users: [this.props.selectedUser?.id],
            chatId: this.props.activeChat?.id || 0,
          });
        }
        this.setProps({ showPopup: false });
      }
    };

    const selectUser = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.children.length === 0) {
        const value = target.innerText;
        const popup = this.children.popupAddUser;
        popup.children.input.setProps({
          value,
        });
      }
    };

    const deleteChatHandler = () => {
      if (this.props.activeChat !== null) {
        const model: CreateChatResponse = { chatId: this.props.activeChat.id };
        deleteChat(model);
      }
    };
    const deleteChatHandlerBind = deleteChatHandler.bind(this);

    const changeChatImageHandler = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLButtonElement;
      const form = target.form as HTMLFormElement;
      this.setProps({ showPopupChangeChatImage: false });
	  const chatId = this.props.activeChat?.id;
      changeChatImage(form, chatId);
    };

    const changeChatImageHandlerBind = changeChatImageHandler.bind(this);

    // Children
    const buttonAddUser = new ButtonAddUser({
      title: "Добавить пользователя",
      events: {
        click: [
          () => {
            this.setProps({ showPopupAdd: true });
          },
        ],
      },
    });

    const popupAddUser = new PopupAdd({
      title: "Добавить пользователя",
      name: "login",
      clickButton: addUser,
      changeInput: searchUser,
      listClick: selectUser,
      events: {
        click: [closePopupBind],
      },
    });

    const buttonDeleteUser = new ButtonDeleteUser({
      title: "Удалить пользователя",
      events: {
        click: [
          () => {
            this.setProps({ showPopupDelete: true });
          },
        ],
      },
    });

    const popupDeleteUser = new PopupAdd({
      title: "Удалить пользователя",
      name: "login",
      clickButton: deleteUser,
      changeInput: searchUser,
      listClick: selectUser,
      events: {
        click: [closePopupBind],
      },
      buttonLabel: "Удалить",
    });

    const buttonDeleteChat = new ButtonDeleteUser({
      title: "Удалить чат",
      events: {
        click: [deleteChatHandlerBind],
      },
    });

    const popupChangeChatImage = new Popup({
      name: "avatar",
      clickButton: changeChatImageHandlerBind,
      events: {
        click: [closePopupBind],
      },
    });

    const buttonChangeChatImage = new ButtonDeleteUser({
      title: "Изменить картинку чата",
      events: {
        click: [
          () => {
            this.setProps({ showPopupChangeChatImage: true });
          },
        ],
      },
    });

    this.children = {
      ...this.children,
      buttonAddUser,
      buttonDeleteUser,
      popupAddUser,
      buttonDeleteChat,
      popupDeleteUser,
      buttonChangeChatImage,
      popupChangeChatImage,
    };
  }

  render(): string {
    return `
            <div class="chatsControlButtons {{className}}">
                {{{buttonAddUser}}}
                {{{buttonDeleteUser}}}
				{{{buttonDeleteChat}}}
				{{{buttonChangeChatImage}}}
                {{#if showPopupAdd}}
                    {{{popupAddUser}}}
                {{/if}}
				{{#if showPopupDelete}}
                    {{{popupDeleteUser}}}
                {{/if}}
				{{#if showPopupChangeChatImage}}
                    {{{popupChangeChatImage}}}
                {{/if}}
            </div>
        `;
  }
}

const mapStateToProps: MapStateToProps = ({
  activeChat,
  usersSearch,
  isLoading,
}) => ({ activeChat, usersSearch, isLoading });

export default connect(mapStateToProps)(ChatsControlButtons);
