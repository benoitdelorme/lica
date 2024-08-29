import Fieldtype from '@/fieldtypes/LayoutPreview.vue';

Statamic.$components.register('layout_preview-fieldtype', Fieldtype);

Statamic.booting(() => {
    Statamic.$components.register('layout_preview-fieldtype', Fieldtype);
    
    Statamic.$conditions.add('hasValue', ({ target, params }) => {
        return new RegExp(params.join('|')).test(target);
    });
})