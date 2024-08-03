import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";


export const middleware = (request : NextRequest) => {
    if (request.nextUrl.pathname.endsWith('/') && !cookies().get('token')) {
        return NextResponse.redirect( new URL('/login', request.url))
    }
    // if (){
    //     return NextResponse.redirect( new URL('/login', request.url))
    // }
    if (request.nextUrl.pathname.startsWith('/login' || 'signup') && cookies().get('token')) {
        return NextResponse.redirect( new URL('/', request.url))

    }
}

// export const config = {
//     matcher : '/'
// }



export default middleware