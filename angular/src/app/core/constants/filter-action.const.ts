import {STATUS_LIST} from "./status.const";
import {ROLE_LIST} from "./role.const";

export const FILTER_ACTION = {
    buttons: {
        add: {
            label: "Добавить",
            icon: "add_circle_outline"
        },
        unlock: {
            label: "Разблокировать",
            icon: "check_circle_outline"
        },
        blocked: {
            label: "Заблокировать",
            icon: "highlight_off"
        },
        filter: {
            label: "Фильтр",
            icon: "filter_list"
        },
    },
    form: {
        title: "Фильтр",
        filterCards: {
            login: {
                title: "Логин",
                icon: "close",
                errorText: "Проверьте правильность введенных данных"
            },
            phone: {
                title: "Телефон",
                icon: "close",
                errorText: "Проверьте правильность введенных данных"
            },
            createAt: {
                title: "Дата создания",
                icon: "apps",
            },
            status: {
                title: "Статус",
                options: STATUS_LIST
            },
            email: {
                title: "E-mail",
                icon: "close",
                errorText: "Проверьте правильность введенных данных"
            },
            isAdmin: {
                title: "Роль",
                options: ROLE_LIST
            },
            updateAt: {
                title: "Дата изменения",
                icon: "apps"
            },
        },
        buttons: {
            apply: {
                label: "Применить"
            },
            cancel: {
                label: "Отмена"
            },
            reset: {
                label: "Сбросить"
            }
        }
    }
};
