const fetchWrapper = (body, url, method, onSuccess, onError, onStart, onComplete) => {
    onStart && onStart();

    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        init.body = JSON.stringify(body);
    }

    fetch(url, init).then((res) => {
        return res.json();
    }).then((result) => {
        onComplete && onComplete();

        if (result.Error) {
            throw new Error(result.Error).message;
        } else {
            onSuccess && onSuccess(result);
        }
    }).catch((err) => {
        console.error("Error: ", err);
        onError && onError(err);
    });
};

const fetchWrapperAuthenticated = (token, body, url, method, onSuccess, onError, onStart, onComplete) => {
    onStart && onStart();
    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
    };

    if (body) {
        init.body = JSON.stringify(body);
    }

    fetch(url, init).then((res) => {
        return res.json();
    }).then((result) => {
        onComplete && onComplete();
        if (result.Error) {
            throw new Error(result.Error).message;
        } else {
            onSuccess && onSuccess(result);
        }
    }).catch((err) => {
        onError && onError(err);
    });
};

export {fetchWrapper, fetchWrapperAuthenticated};