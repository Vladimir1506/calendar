import {Dayjs} from 'dayjs';

export const rules = {
    getRules: (message: string = 'Обязательное поле') => ({
        required: true,
        message
    }),
    isDateAfter: (message: string) => () => ({
        validator(_: any, value: Dayjs) {
            if (value.toDate().getTime() < new Date().getTime()) {
                return Promise.reject(new Error(message))
            } else return Promise.resolve()
        }
    })
}
