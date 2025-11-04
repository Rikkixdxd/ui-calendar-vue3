
export const formatDate = (
    date: Date
): string => {
    const f = (n: number) => ('00' + n).slice(-2)
    return `${date.getFullYear()}-${f(date.getMonth() + 1)}-${f(date.getDate())}`
}

export const nextMonth = (
    date: Date
): Date => {
    const d = new Date(date)
    d.setMonth(d.getMonth() + 1)
    return d
}

export const prevMonth = (
    date: Date
): Date => {
    const d = new Date(date)
    d.setMonth(d.getMonth() - 1)
    return d
}

export const daysInMonth = (
    month: number, 
    year: number
): number => new Date(year, month + 1, 0).getDate();

export const daysCountToArray = (
    count: number
): number[] => {
    return Array.from({length: count},(value, key) => key + 1)
}

export const dayName = (
    date: Date, 
    locale: Intl.LocalesArgument,
    type: Intl.DateTimeFormatOptions['weekday'] = 'short'
): string => date.toLocaleDateString(locale, { weekday: type });

export const monthName = (
    date: Date, 
    locale: Intl.LocalesArgument, 
    type: Intl.DateTimeFormatOptions['month'] = 'short'
): string => date.toLocaleDateString(locale, { month: type });

export const weekdaysNameArray = (
    locale: Intl.LocalesArgument
): string[] => {
    const weekdayNames = [];
    const date = new Date(2025, 0, 6);

    for (let i = 0; i < 7; i++) {
        weekdayNames.push(dayName(date, locale, 'short'));
        date.setDate(date.getDate() + 1);
    }

    return weekdayNames;
}

export const calendarData = (
    date: Date    
):{
    daysToPrepend: number[],
    currentMonthDays: number[],
    daysToAppend: number[]
} => {
    const prevMonthDayCount = daysInMonth(date.getMonth() - 1, date.getFullYear())
    const currentMonthDayCount = daysInMonth(date.getMonth(), date.getFullYear())
    const nextMonthDayCount = daysInMonth(date.getMonth() + 1, date.getFullYear())
    
    const firstDayNameCount = new Date(new Date(date).setDate(1)).getDay()
    const daysToPrependCount = firstDayNameCount - 1
    
    const currentMonthDays = daysCountToArray(currentMonthDayCount)
    const daysToPrepend = daysToPrependCount > 1 ? daysCountToArray(prevMonthDayCount).slice(-daysToPrependCount) : []
    const daysToAppend = daysCountToArray(nextMonthDayCount).slice(0, 42 - (currentMonthDayCount + daysToPrepend.length))

    return {daysToPrepend, currentMonthDays, daysToAppend}
}