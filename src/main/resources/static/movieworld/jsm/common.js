function SetToken(token, admin) {
    document.cookie = `access_token=${token}; Secure`;
    document.cookie = `isAdmin=${admin}; Secure`;
    console.log(token, admin);
    tk = document.cookie.split("=");
    console.log(document.cookie);
}

function GetToken() {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

    return token;
}

function IsAdmin() {
    const isAdmin = document.cookie
        .split("; ")
        .find((row) => row.startsWith("isAdmin="))
        ?.split("=")[1];

    return isAdmin == "true" ? true : false;
    // return true;
}

const LoadData = async (_url, optons = {}) => {
    const response = await fetch(_url, optons);
    let data;
    if (response.ok) {
        try {
            data = await response.json();
        } catch (error) {
            data = await "{}";
        }
    } else {
        try {
            data = await response.text();
        } catch (error) {
            data = await "{}";
        }
    }
    return data
};
