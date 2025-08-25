import {useSignal} from "../hooks/useSignal.ts";


export function useHomePageStats() {
    const {signal: cpuSignal, lastValue: CPULastValue} = useSignal({signalPath: '$solid/hardwareMetrics/cpu', pollInterval: 1000})
    const {signal: memSignal, lastValue: memLastValue} = useSignal({signalPath: '$solid/hardwareMetrics/memory', pollInterval: 1000})
    const {signal: diskSignal, lastValue: diskLastValue} = useSignal({signalPath: '$solid/hardwareMetrics/disk', pollInterval: 1000})

    const totalMemory = parseInt(memSignal?.properties?.totalMemory),
        // @ts-expect-error ts can't infer that totalMemory is a number
        memPercent = Math.round((parseInt(memLastValue) / parseInt(totalMemory)).toFixed(2) * 100),
        totalDisk = parseInt(diskSignal?.properties?.info.totalGb)



    return [
        {label: "CPU Usage", count: `${cpuSignal?.properties?.cpus?.length} CPUs`, part: CPULastValue, color: '#47d6ab'},
        {label: "Memory Usage", count: `Total Memory: ${Math.round(totalMemory / 1024 / 1024 / 1024)} GB`, part: memPercent, color: '#03141a'},
        {label: "Disk Usage", count: `Total Disk: ${totalDisk} GB`, part: diskLastValue, color: '#4fcdf7'}
    ]
}