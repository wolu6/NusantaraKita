<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b">
    <div class="flex items-center gap-2 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <template v-for="(item, index) in breadcrumbs" :key="index">
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink :href="item.href">
                {{ item.name }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" class="hidden md:block" />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

const route = useRoute()
const breadcrumbs = ref<Array<{name: string, href: string}>>([])

const updateBreadcrumbs = () => {
  const pathArray = route.path.split('/').filter(item => item)

  const crumbs = []
  let pathSoFar = ''

  for (let i = 0; i < pathArray.length; i++) {
    pathSoFar += `/${pathArray[i]}`
    crumbs.push({
      name: pathArray[i].charAt(0).toUpperCase() + pathArray[i].slice(1).replace(/-/g, ' '),
      href: pathSoFar
    })
  }

  if (crumbs.length === 0) {
    crumbs.push({ name: 'Overview', href: '/' })
  }

  breadcrumbs.value = crumbs
}

watch(() => route.path, () => {
  updateBreadcrumbs()
}, { immediate: true })
</script>
