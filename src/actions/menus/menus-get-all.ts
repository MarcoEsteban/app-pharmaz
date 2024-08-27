'use server'

import prisma from "@/libs/prisma"

export const getAllMenus = async () => {
  try {

    const menus = await prisma.menus.findMany({
      select: {
        id: true,
        nombre: true,
        enlace: true,
        icon: true
      }
    })
    
    return menus;
    
  } catch (error) {
    
    console.log(error) 
    return [];
  }  
}
