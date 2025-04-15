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
  SidebarRail
} from '@/components/ui/sidebar'
import SidebarFooter from './ui/sidebar/SidebarFooter.vue'
import { Github } from 'lucide-vue-next'

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
          isActive: false
        },
        {
          title: 'Tentang API',
          url: '/tentang-api',
          isActive: false
        },
        {
          title: 'Fitur Utama',
          url: '/fitur-utama',
          isActive: false
        },
        {
          title: 'Panduan Instalasi',
          url: '/panduan-instalasi',
          isActive: false
        }
      ]
    },
    {
      title: 'API Documentation',
      url: '#',
      items: [
        {
          title: 'GET Provinsi',
          url: '/api-documentation/get-provinsi',
          isActive: false
        },
        {
          title: 'GET Kabupaten/Kota',
          url: '/api-documentation/get-kabupaten-kota',
          isActive: false
        },
        {
          title: 'GET Kecamatan',
          url: '/api-documentation/get-kecamatan',
          isActive: false
        },
        {
          title: 'GET Desa/Kelurahan',
          url: '/api-documentation/get-desa-kelurahan',
          isActive: false
        }
      ]
    },
    {
      title: 'Data Wilayah',
      url: '#',
      items: [
        {
          title: 'Provinsi',
          url: '/data-wilayah/provinsi',
          isActive: false
        },
        {
          title: 'Kabupaten/Kota',
          url: '/data-wilayah/kabupaten-kota',
          isActive: false
        },
        {
          title: 'Kecamatan',
          url: '/data-wilayah/kecamatan',
          isActive: false
        },
        {
          title: 'Desa/Kelurahan',
          url: '/data-wilayah/desa-kelurahan',
          isActive: false
        }
      ]
    }
  ]
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="/">
              <div
                class="flex mt-1 aspect-square size-10 items-center justify-center rounded-lg text-sidebar-primary-foreground"
              >
                <img src="/logo.png" alt="logo nusantara kita" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="text-base font-medium">Nusantara Kita</span>
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
              <SidebarMenuSubItem
                v-for="childItem in item.items"
                :key="childItem.title"
              >
                <SidebarMenuSubButton as-child :is-active="childItem.isActive">
                  <a :href="childItem.url">{{ childItem.title }}</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <a
        target="_blank"
        class="bg-zinc-700 p-2 rounded-md text-white font-semibold text-sm flex justify-center items-center gap-x-2"
        href="https://github.com/Yuefii/NusantaraKita"
      >
        <Github />
        SOURCE CODE
      </a>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
