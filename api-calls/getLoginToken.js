import * as nodeFetch from "node-fetch"

export const getLoginToken = async () => {
    const response = await nodeFetch("http://localhost:2221/api/login",{
        method: "POST",
        body: JSON.stringify({"username": "admin", "password": "Admin123"})
    })
    if(response.status !== 200){
        throw new Error("An error occured trying to retrieve login token")
    }
    const body = await response.json()
    return body.token
}
