import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH (
    req : Request,
    {params} : {params : {storeid : string}}
){
    try {
        const {userId} = auth()
        const body = await req.json();

        const {name} = body;

        
    console.log("userId:", userId);
    console.log("name:", name);
    console.log("storeid:", params.storeid);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        if(!params.storeid){
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeid,
                userId
            
            },
            data : {
                name
            }
        })
console.log(store)
        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_PATCH]',error) 
        return new NextResponse("Internal Server Error", { status: 500 })
      
    }
}

export async function DELETE (
    req : Request,
    {params} : {params : {storeid : string}}
){
    try {
        const {userId} = auth()
 
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!params.storeid){
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeid,
                userId
            
            }
        })

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORES_DELETE]',error) 
        return new NextResponse("Internal Server Error", { status: 500 })
      
    }
}
