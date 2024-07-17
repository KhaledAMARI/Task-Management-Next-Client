export const getTasks = async () => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_API_URI}/tasks`, options);
        if (!response.ok) {
            console.log('An Error has occurred: Cannot get data from server');
        }
        const {data, meta } = await response.json();
        return { data, meta };
        
    } catch (error) {
        console.log('An Error has occurred: ', error);
    }
}

