function getHost() {
    return "http://192.168.0.179:8080/";
    // return "/";
}

function getRoot() {
    return "/src/main/resources/static";
    // return "/";
}


function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    window.location.href = `${getRoot()}`;
}

try {
    document.getElementById('logout-link').addEventListener('click', function(event) {
        event.preventDefault();
        deleteAllCookies();
    });
} catch (error) {
    console.log(error);
}

try {
    HasLogin() ? $("#logout-link").show() : $("#logout-link").hide();
} catch (error) {
    console.log(error);
}

try {
    HasLogin() ? $("#login-link").hide() : $("#login-link").show();
} catch (error) {
    console.log(error);
}



function SetToken(token, admin) {
    document.cookie = `access_token=${token};`;
    document.cookie = `isAdmin=${admin};`;
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
}

function HasLogin() {
    const isAccess = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];
    return isAccess ? true : false;
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

async function LoadDataAsync(_url, optons = {}){
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
}
