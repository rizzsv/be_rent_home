import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getManager = async (req: Request, res: Response): Promise<void> => {
    try {
       const {cognitoId} = req.params;
       const manager = await prisma.manager.findUnique({
        where: {cognitoId},
       });

       if(manager) {
        res.json(manager)
       } else {
        res.status(404).json({message: "manager not found"})
       }
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving manager: ${error.message} `})
    }
}

export const CreateManager = async (req: Request, res: Response): Promise<void> => {
    try {
       const {cognitoId, name, email, phoneNumber} = req.body;
       const manager = await prisma.manager.create({
        data: {
            cognitoId,
            name, 
            email,
            phoneNumber
        }
       });

       res.status(201).json(manager);
    } catch (error: any) {
        res.status(500).json({message: `Error creating manager: ${error.message} `})
    }
}

export const UpdateManager = async (req: Request, res: Response): Promise<void> => {
    try {
    const {cognitoId} = req.params;
       const { name, email, phoneNumber} = req.body;
       const Updatemanager = await prisma.manager.update({
        where: {cognitoId},
        data: {
            name, 
            email,
            phoneNumber
        }
       });

       res.json(Updatemanager);
    } catch (error: any) {
        res.status(500).json({message: `Error update manager: ${error.message} `})
    }
}

export const getManagerProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
   try {
    const { cognitoId } = req.params;
    const manager = await prisma.manager.findUnique({
        where: { cognitoId}
    })

    const properties = await prisma.property.findMany({
        where: {managerCognitoId: cognitoId},
        include: {
            location: true,
        }
    })

    const propertiesWithFormattedLocation = await Promise.all(
        properties.map(async (property) => {
    const coordinates: {coordinates: string}[] = 
    await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates FROM "Location" WHERE id = ${property.location.id}`

    const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
    const longitude = geoJSON.coordinates[0];
    const latitude = geoJSON.coordinates;

    return {
        ...property,
        location: {
            ...property.location,
            coordinates: {
                longitude,
                latitude,
            }
        }
    }
        })
        
    ) 
    res.json(propertiesWithFormattedLocation) 
   } catch (error: any) {
    res.status(500).json({message: `Error retrieving managerProperty: ${error.message} `})
   }
}


