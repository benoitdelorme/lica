<!-- BEGIN TEXT WRAPPER -->
@php $height = $forceHeight ?? false; @endphp
<table cellpadding="0" cellspacing="0" border="0" id="{{ $id ?? '' }}" align="left" width="{{ $maxW ?? '500' }}" style="border-collapse: collapse; width: 100%; max-width: {{ isset($maxW) ? $maxW.'px' : '500px' }};">
    <tr>
        <td  cellpadding="0" cellspacing="0" border="0" align="left" valign="top" class="{{ $className ?? 'text-wrapper' }}" style="
            border-collapse: collapse;
            padding: {{ $padding ?? 0 }};
            margin: {{$margin ?? 0}};
            background-color: {{ $bgColor ?? '#FFFFFF' }};
            background-repeat: no-repeat;
            background-size: contain;
            {{--color:  {{ $color ?? '#000000' }};--}}
            @if($height)height:{{ $height }}!important;@endif
            font-size: {{ $fontSize ?? '16px' }};
            line-height: {{ $lineHeight ?? '1.375' }};
        ">
            {{ $slot }}
        </td>
    </tr>
</table>
<!-- END TEXT WRAPPER -->
