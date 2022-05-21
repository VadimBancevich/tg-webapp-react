
export const Confirm = ({ services, employee, dateTime }) => {

    const tgm = window.Telegram;
    const { sendData,close } = tgm.WebApp;


    return (
        <div>
            <h5>Ваша запись: </h5>
            <div>
                {services.reduce((pv, cv, i, a) => `${pv} ${cv} ${a.length - 1 === i ? '' : ','}`, 'Услуги: ')}
            </div>
            <div>
                <span>{`Master: ${employee.firstName} ${employee.lastName || ''}`}</span>
            </div>
            <div>
                <span>{new Date(dateTime).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</span>
            </div>
            <button
                style={{
                    width: ' 100%',
                    position: 'fixed',
                    bottom: 0
                }}
                
                onClick={() => {

                    sendData(JSON.stringify({ services, emplId: employee.id, dateTime }))

                    close()

                }}

            >
                Записаться
            </button>
        </div>
    )

}