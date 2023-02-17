import { Ref, ref } from 'vue'
import { GlobalTheme, darkTheme } from 'naive-ui'
export type Theme = Ref<GlobalTheme | null>

export default function useTheme() {
    let theme: Theme = ref(null)
    function toggleTheme() {
        theme.value = theme.value === null ? darkTheme : null
    }
    return {
        theme,
        toggleTheme,
    }
}
