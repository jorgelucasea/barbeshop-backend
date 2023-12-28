import { Field, registerEnumType } from "@nestjs/graphql";

export enum BarberService {
    CABELO = "CABELO",
    BARBA = "BARBA",
    BARBA_E_CABELO = "BARBA_E_CABELO",
    PINTAR = "PINTAR",
}

registerEnumType(BarberService, {
    name: "BarberService", // este é o nome do tipo de enumeração no esquema GraphQL
});