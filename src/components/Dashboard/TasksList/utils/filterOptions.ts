export const getFilteredOptions = (options: string[], selectedOption: string) => {
    return options.filter(option => option !== selectedOption);
};