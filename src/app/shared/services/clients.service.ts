import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  // Lista de clientes - fuente única de verdad
  private readonly clients: Client[] = [
    {
      id: 'seguros-bolivar',
      name: 'Seguros Bolívar',
      logoUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/97c32890-versionprincipal-horizontal-png_106701w000000000000028.png',
      websiteUrl: 'https://www.segurosbolivar.com/',
      altText: 'Seguros Bolívar'
    },
    {
      id: 'arl-seguros-bolivar',
      name: 'ARL Seguros Bolívar',
      logoUrl: 'https://d9hhrg4mnvzow.cloudfront.net/www.saludbolivarips.com/2d2f0fa7-logo-arl-bolivar_10aa01z0aa01w000000028.png',
      websiteUrl: 'https://www.segurosbolivar.com/arl',
      altText: 'ARL Seguros Bolívar'
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los clientes
   * @returns Array con todos los clientes
   */
  getAllClients(): Client[] {
    return [...this.clients];
  }

  /**
   * Busca un cliente por su ID
   * @param id ID del cliente a buscar
   * @returns Cliente encontrado o undefined si no existe
   */
  getClientById(id: string): Client | undefined {
    return this.clients.find(client => client.id === id);
  }

  /**
   * Obtiene solo los clientes que tienen website
   * @returns Array de clientes con website configurado
   */
  getClientsWithWebsite(): Client[] {
    return this.clients.filter(client => client.websiteUrl && client.websiteUrl.trim() !== '');
  }

  /**
   * Busca clientes por nombre (búsqueda parcial, insensible a mayúsculas)
   * @param searchTerm Término de búsqueda
   * @returns Array de clientes que coinciden con el término de búsqueda
   */
  searchClientsByName(searchTerm: string): Client[] {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    if (!normalizedSearch) {
      return [];
    }

    return this.clients.filter(client => 
      client.name.toLowerCase().includes(normalizedSearch)
    );
  }

  /**
   * Obtiene el total de clientes
   * @returns Número total de clientes
   */
  getClientsCount(): number {
    return this.clients.length;
  }
}
