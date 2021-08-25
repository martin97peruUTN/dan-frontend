import React from 'react'
import { Menubar as MenubarPrime } from 'primereact/menubar';
import {Button} from 'primereact/button';

const Menubar = () => {

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            url: '/'
        },
        {
            label: 'Clientes',
            icon: 'pi pi-fw pi-users',
            items: [
                {
                    label: 'Nuevo',
                    icon: 'pi pi-fw pi-plus',
                    url: '/cliente-nuevo'
                },
                {
                    label: 'Listado',
                    icon: 'pi pi-fw pi-list',
                    url: '/cliente-listado'
                }
            ]
        },
        {
            label: 'Obras',
            icon: 'pi pi-fw pi-directions',
            items: [
                {
                    label: 'Nueva',
                    icon: 'pi pi-fw pi-plus',
                    url: '/obra-nueva'
                }
            ]
        },
        {
            label: 'Productos',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                {
                    label: 'Alta',
                    icon: 'pi pi-fw pi-plus',
                    url: '/producto-nuevo'
                }
            ]
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'Nuevo',
                    icon: 'pi pi-fw pi-plus',
                    url: '/pedido-nuevo'
                },
                {
                    label: 'Listado',
                    icon: 'pi pi-fw pi-list',
                    url: '/pedido-listado'
                }
            ]
        },
        {
            label: 'Pagos',
            icon: 'pi pi-fw pi-dollar',
            items: [
                {
                    label: 'Registrar',
                    icon: 'pi pi-fw pi-plus',
                    url: '/pago-nuevo'
                },
                {
                    label: 'Listado',
                    icon: 'pi pi-fw pi-list',
                    url: '/pago-listado'
                }
            ]
        },
    ];

    const end = <Button className="btn-primary" label="Salir" icon="pi pi-power-off"/>;

    return (
        <MenubarPrime className="sticky top-0 z-5" model={items} end={end} />
    )
}

export default Menubar
