<template>
    <div class="ui-calendar">
        <div class="ui-calendar__container">
            <div class="ui-calendar__header">
                <div @click="handleLeft()" class="ui-calendar__prev">&#10148;</div>
                <div class="ui-calendar__date">{{ monthName(chosenDate, locale) }} {{ chosenDate.getFullYear() }}</div>
                <div @click="handleRight()" class="ui-calendar__next">&#10148;</div>
            </div>
            <div class="ui-calendar__weekdays">
                <div v-for="value in weekdaysNames" v-text="value"/>
            </div>
            <div class="ui-calendar__days">
                <div 
                    v-for="value in data.daysToPrepend" 
                    v-text="value" 
                    class="ui-calendar__prepend" 
                />
                <div 
                    v-for="value in data.currentMonthDays" 
                    @click="selectDay(value)"
                    v-text="value" 
                    :class="{'ui-calendar__current--selected': value === selectedDay}" 
                    class="ui-calendar__current" 
                />
                    <div 
                    v-for="value in data.daysToAppend" 
                    v-text="value" 
                    class="ui-calendar__append" 
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { monthName, calendarData, weekdaysNameArray, prevMonth, nextMonth, formatDate } from './CalendarUtils'
// functions
const handleLeft = () => {
    selectedDay.value = null
    let monthCount = new Date(chosenDate.value).getMonth()
    if(monthCount <= 0) monthCount = 11
    chosenDate.value = prevMonth(chosenDate.value)
} 

const handleRight = () => {
    selectedDay.value = null
    let monthCount = new Date(chosenDate.value).getMonth()
    if(monthCount >= 11) monthCount = 0
    chosenDate.value = nextMonth(chosenDate.value)
    
}

const selectDay = (day: number) => {
    selectedDay.value = day
    chosenDate.value = new Date(chosenDate.value.setDate(selectedDay.value))
    emit('dateChosen', formatDate(chosenDate.value))
}
// setup
const emit = defineEmits<{
    (e: 'dateChosen', date: string): void
}>()

const props = defineProps<{
    date?: string,
    locale: Intl.LocalesArgument
}>()

const chosenDate = ref<Date>(new Date(props.date ?? Date.now()))
const data = computed(()=> calendarData(chosenDate.value))
const weekdaysNames = computed(()=>weekdaysNameArray(props.locale))
const selectedDay = ref<number | null>(chosenDate.value.getDate())

watch(props, (newVal)=>{
    if(newVal.date) chosenDate.value = new Date(newVal.date)
})
</script>

<style scoped lang="sass">
.ui-calendar
    width: 300px
    user-select: none

    &__days, &__weekdays
        display: grid
        grid-template-columns: repeat(7, 1fr)
        text-align: center
        line-height: 1

        > div
            aspect-ratio: 1/1
            display: flex
            align-items: center
            justify-content: center
    
    &__weekdays
        border-bottom: 1px solid #bebebe

    &__container
        padding: 10px
        background-color: white
        border: 1px solid #bebebe

    &__header
        display: flex
        justify-content: space-between
        align-items: center
        line-height: 1
    
    &__prev
        transform: rotate(180deg)

    &__prev,&__next
        padding: 8px
        cursor: pointer
    &__prepend, &__append
        opacity: 0.35

    &__current
        background-color: #f6fafb
        border: 1px solid transparent
        cursor: pointer

        &:hover
            border: 1px solid #00afe8

    &__current--selected
        background-color: #00afe8
        color: white
</style>