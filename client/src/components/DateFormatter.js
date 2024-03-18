
const dateFormatter = new Intl.DateTimeFormat('us-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

export default dateFormatter;