<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    methods: {
        formatCreatedAt(createdAt: string) {
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', options);
            return formattedDate;
        }
    }
});
</script>

<template>
    <div class="grid grid-cols-1 bg-gray-200 p-3 w-[500px] mt-4 rounded-md">
        <div class="flex flex-wrap justify-between">
            <div>{{ username }}</div>
            <div>{{ formatCreatedAt(createdAt.toString()) }}</div>
        </div>
        <div class="flex mt-2 text-start">
            {{ content }}
        </div>
    </div>
</template>