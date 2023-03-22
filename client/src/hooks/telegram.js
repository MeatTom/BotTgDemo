const telegram = window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        telegram.close()
    }


    const onToggleButton = () => {
        if(telegram.MainButton.isVisible){
            telegram.MainButton.hide()
        } else {
            telegram.MainButton.show()
        }
    }

    return {
        onClose,
        telegram,
        user: telegram.initDataUnsafe?.user,
        onToggleButton,
    }
}