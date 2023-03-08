@props(['active'])

@php
$classes = ($active ?? false)
            ? 'parent-nav block pl-3 pr-4 py-2 border-l-4 border-yellow-300 text-base font-semibold text-gray-700 bg-yellow-50 focus:outline-none focus:text-yellow-800 focus:bg-yellow-100 focus:border-yellow-700 transition duration-150 ease-in-out'
            : 'parent-nav block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out';
@endphp

<div x-data="{ open: false }" @click.away="open = false" @close.stop="open = false" @click="open = ! open" {{ $attributes->merge(['class' => $classes]) }} >
    <div>
        {{ $name }}

        <div class="ml-1 inline-block relative top-1">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </div>
    </div>

    <div class="children border border-gray-300 mt-3" 
    x-show="open"
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="transform opacity-0 scale-95"
    x-transition:enter-end="transform opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-75"
    x-transition:leave-start="transform opacity-100 scale-100"
    x-transition:leave-end="transform opacity-0 scale-95">
        {{ $children }}
    </div>
</div>