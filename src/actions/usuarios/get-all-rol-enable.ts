
'use server';

import prisma from "@/libs/prisma";

export const getAllRolEnable = async () => {
  try {
    const roles = await prisma.roles.findMany({
      where: { estado: true },
      select: {
        id: true,
        nombre: true,
        estado: true,
      }
    })

    return roles;
    
  } catch (error) {
    
    console.log({error})
    return [];
    
  }
}
