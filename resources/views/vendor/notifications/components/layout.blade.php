<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="robots" content="noindex, nofollow" />
    <meta name="format-detection" content="telephone=no">
    <title>{{ $subject ?? '' }}</title>
    <style>
        @media  only screen and (max-device-width: 500px) {

            #line-wrapper,
            .line-wrapper,
            #separator-wrapper,
            #footer {
                width: 100%!important;
                max-width: 500px !important;
            }

            /* List gmail */
            u + .body .glist { margin-left: 0 !important; }
            @media only screen and (max-width: 640px) {
                u + .body .g
                list { margin-left: 15px !important; }
            }
            /* List gmail */

            .text-wrapper,
            .foot-left,
            .foot-right {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            .text-wrapper.pr-0 {
                padding-right: 0px !important;
            }

            .pr-0 {
                padding-right: 0px !important;
            }

            .separator-wrapper {
                padding-left: 30px !important;
            }

            #title-wrapper,
            #title-wrapper > table {
                width: 100%!important;
            }

            .title-spacer-dot {
                padding-top: 7px!important;
                width: 40px !important;
                overflow:hidden;
            }
            .title-spacer-dot--weird-one{
                padding-top: 7px!important;
                width: 30px !important;
                overflow:hidden;
            }

            .title-spacer-dot-cta,
            .title-spacer-dot img,
            .title-spacer-dot--weird-one img{
                display: none!important
            }

            .title-content-dot {
                padding-right: 20px !important;
            }

            .title-content-dot--weirdone {
                padding-right: 0!important;
            }

            .title-content-dot h1 {
                font-size: 22px!important;
            }

            #title-wrapper .content {
                width: auto !important;
            }

            .gala-wrapper {
                padding-left: 30px !important;
            }

            .gala-circle {
                padding-left: 30px !important;
            }
            .bg-leaf {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .container {
                width: 100% !important; 
                max-width: 500px !important;
            }

            .cta,
            .cta tbody,
            .cta tr,
            .cta td,
            .reserve-btn-wrapper,
            .reserve-btn-wrapper tbody,
            .reserve-btn-wrapper .tr,
            .reserve-btn-wrapper .td,
            .worskhops,
            .worskhops tr,
            .worskhops td {
                display: block !important;
                width: auto !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .cta td {
                text-align: center !important;
            }

            .reserve-btn-wrapper .td {
                text-align: left !important;
            }

            .reserve-btn-wrapper .td a {
                margin-top: 20px !important;
            }

            .calendar,
            .calendar tr,
            .calendar tbody,
            .calendar td {
                display: block !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .section-title-w-image,
            .section-title-title,
            .section-title-image {
                display: block !important;
                width: auto !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .title-content-dot--weirdone .section-title-image {
                padding-right: 20px !important;
            }


            .section-title-image {
                margin: 0 auto 0 auto !important;
                background-position: center 35px !important;
            }

            .section-title-image img {
                margin: auto!important;
            }

            .section-title-title {
                padding-top: 0 !important;
            }

            .section-title-title h1{
                margin-bottom: 40px!important;
            }

            .note .text {
                font-size: 15px !important;
            }
            .note .arrow {
                padding-left: 30px !important;
            }
            .note .spacer {
                width: 30px !important;
            }

            #two-columns .two-columns_title h1 {
                font-size: 29px !important;
            }

            #two-columns .text-wrapper {
                padding-right: 0px !important;
            }

            #spacer-empty {
                width: 100%!important;
            }

            .sdt-date {
                font-size: 29px !important;
            }

            .spacer {
                padding-top: 5px!important;
            }

            .date-decorator {
                display: none!important;
            }
        }
        .f-0 {
            font-size: 0!important;
        }
    </style>

    @stack('style')

</head>
<body style="margin: 0;padding: 0;font-family: Arial, sans-serif;">
    <!--[if gt mso 15]>
     <style type="text/css" media="all">
     /* Outlook 2016 Height Fix */
     table, tr, td {border-collapse: collapse;}
     tr { font-size:0px; line-height:0px; border-collapse: collapse; }
     </style>
     <![endif]-->
    <div style="height: 0; background-color: #fff; color: #fff; font-size: 0; visibility: hidden;">{{ $preheader ?? '' }}</div>
    @yield('content')
</body>
</html>