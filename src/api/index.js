import http from "@/utils/request";


export const getData = () => {
    //返回一个promis对象
    return http.get('/home/getData')
}