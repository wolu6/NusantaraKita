<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  type SidebarProps,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = defineProps<SidebarProps>()

const data = {
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Overview',
          url: '/',
          isActive: false,
        },
        {
          title: 'Tentang API',
          url: '/tentang-api',
          isActive: false,
        },
        {
          title: 'Fitur Utama',
          url: '/fitur-utama',
          isActive: false,
        },
        {
          title: 'Panduan Instalasi',
          url: '/panduan-instalasi',
          isActive: false,
        },
      ],
    },
    {
      title: 'API Documentation',
      url: '#',
      items: [
        {
          title: 'GET Provinsi',
          url: '/api-documentation/get-provinsi',
          isActive: false,
        },
        {
          title: 'GET Kabupaten/Kota',
          url: '/api-documentation/get-kabupaten-kota',
          isActive: false,
        },
        {
          title: 'GET Kecamatan',
          url: '/api-documentation/get-kecamatan',
          isActive: false,
        },
        {
          title: 'GET Desa/Kelurahan',
          url: '/api-documentation/get-desa-kelurahan',
          isActive: false,
        },
      ],
    },
    {
      title: 'Data Wilayah',
      url: '#',
      items: [
        {
          title: 'Provinsi',
          url: '/data-wilayah/provinsi',
          isActive: false,
        },
        {
          title: 'Kabupaten/Kota',
          url: '/data-wilayah/kabupaten-kota',
          isActive: false,
        },
        {
          title: 'Kecamatan',
          url: '/data-wilayah/kecamatan',
          isActive: false,
        },
        {
          title: 'Desa/Kelurahan',
          url: '/data-wilayah/desa-kelurahan',
          isActive: false,
        },
      ],
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="/">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img src="/logo.png" alt="logo nusantara kita">
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Nusantara Kita</span>
                <span class="">v2.0</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
            <SidebarMenuButton as-child>
              <a :href="item.url" class="font-medium">
                {{ item.title }}
              </a>
            </SidebarMenuButton>
            <SidebarMenuSub v-if="item.items.length">
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child :is-active="childItem.isActive">
                  <a :href="childItem.url">{{ childItem.title }}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
