import { ref, watch } from "vue";

export function useDebounce(value: any, delay: number) {
  const debouncedValue = ref(value.value);

  let timeoutId: NodeJS.Timeout | undefined = undefined;

  watch(value, (newValue) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  return debouncedValue;
}
