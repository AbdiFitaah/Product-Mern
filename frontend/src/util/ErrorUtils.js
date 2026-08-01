export const extractErrorMessage = (error) => {
    if(!error) {
        return ;
    }
    if(error.response?.data){
        const data = error.response.data;

        //handle zod by its default

        if(data.errors && Array.isArray(data.errors)){

            return data.errors.map(err => err.message).join(', ');
        }
        // handle single error message

        if(data.message){
            return data.message;
        }

        // handle error feild
        if(data.error){
            return data.error;
        }


    }

    // handle network error

        if(error.response?.status === 0){
            return 'Network error. Please check your internet connection.';
        }


        // fallback general error message

        return 'An error occurred. Please try again later.';
}