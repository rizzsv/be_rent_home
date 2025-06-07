import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

// --- get tenant by id/cognitoId ---
export const getTenant = async (req: Request, res: Response): Promise<void> => {
    try {
       const {cognitoId} = req.params;
       const tenant = await prisma.tenant.findUnique({
        where: {cognitoId},
        include: {
            favorites: true
        }
       });

       if(tenant) {
        res.json(tenant)
       } else {
        res.status(404).json({message: "Tenant not found"})
       }
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving tenant: ${error.message} `})
    }
}

// --- create tenant ---
export const CreateTenant = async (req: Request, res: Response): Promise<void> => {
    try {
       const {cognitoId, name, email, phoneNumber} = req.body;
       const tenant = await prisma.tenant.create({
        data: {
            cognitoId,
            name, 
            email,
            phoneNumber
        }
       });

       res.status(201).json(tenant);
    } catch (error: any) {
        res.status(500).json({message: `Error creating tenant: ${error.message} `})
    }
}

// --- update tenant ---
export const UpdateTenant = async (req: Request, res: Response): Promise<void> => {
    try {
        const {cognitoId} = req.params;
       const { name, email, phoneNumber} = req.body;
       const UpdateTenant = await prisma.tenant.update({
        where: {cognitoId},
        data: {
            name, 
            email,
            phoneNumber
        }
       });

       res.json(UpdateTenant);
    } catch (error: any) {
        res.status(500).json({message: `Error update tenant: ${error.message} `})
    }
}

// --- get tenant properties ---
export const GetCurrentResidence = async (
    req: Request,
    res: Response
): Promise<void> => {
   try {
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
        where: {tenants: {some: {cognitoId}}},
        include: {
            location: true,
        }
    })

    const residenceWithFormattedLocation = await Promise.all(
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
    res.json(residenceWithFormattedLocation) 
   } catch (error: any) {
    res.status(500).json({message: `Error retrieving tenantProperty: ${error.message} `})
   }
}

// --- add favorite property ---
export const AddFavoriteProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
   try {
    const {cognitoId, propertyId} = req.params;
    const tenant = await prisma.tenant.findUnique({
        where: {cognitoId},
        include: {
            favorites: true,
        }
    })

    const propertyIdNumber = Number(propertyId);
    const existingFavorites = tenant?.favorites || [];

    if (!existingFavorites.some((fav) => fav.id === propertyIdNumber)) {
        const UpdateTenant = await prisma.tenant.update({
            where: {cognitoId},
            data: {
                favorites: {
                    connect: {id: propertyIdNumber}
                }
            },
            include: {
                favorites: true,
            }
        })
        res.json(UpdateTenant);
    } else {
        res.status(490).json({message: "Property already added to favorites"})
    }
   } catch (error: any) {
      res.status(500).json({message: `Error adding favorite property: ${error.message} `})
   }
} 

// --- remove favorite property ---
export const RemoveFavoriteProperty = async (
    req: Request,
    res: Response
): Promise<void> => {
   try {
    const {cognitoId, propertyId} = req.params;
    const tenant = await prisma.tenant.findUnique({
        where: {cognitoId},
        include: {
            favorites: true,
        }
    })

    const propertyIdNumber = Number(propertyId);
    const updatedTenant = await prisma.tenant.update({
        where: {cognitoId},
        data: {
            favorites: {
                disconnect: {id: propertyIdNumber}
            }
        },
        include: {
            favorites: true,
        }
    })
    res.json(updatedTenant);
   } catch (error: any) {
      res.status(500).json({message: `Error removing favorite property: ${error.message} `})
   }
} 
