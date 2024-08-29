@extends('vendor.notifications.components.layout', [
    'subject' => "Soumission",
    'preheader' => "Soumission"
]
)
@section('content')
    @component('vendor.notifications.components.text-wrapper', ['padding' => '0', 'className' => 'header'])
        <img src="https://{{ $_SERVER['HTTP_HOST']; }}/images/intro-mail.jpg') }}" width="400" height="106" style="display:block; margin: 0; padding: 0;max-width: 100%;height: auto;" alt="">
    @endcomponent
    @component('vendor.notifications.components.text-wrapper', ['padding' => '0', 'className' => 'header'])
        <table cellpadding="0" cellspacing="0" border="0" align="left" width="100%" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #021D46;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Vous avez reçu une nouvelle soumission via le site Barbeau (https://{{ $_SERVER['HTTP_HOST'];}}) :
                    </p>
                </td>
            </tr>
        </table>
    @endcomponent
    @component('vendor.notifications.components.text-wrapper', ['padding' => '20px 40px 20px 50px', 'bgColor' => '#021D46','color' => '#00315d', 'className' => 'title-wrapper'])
        <table cellpadding="0" cellspacing="0" border="0" align="left" width="100%" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #fff;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Full Name : {{ $full_name }}
                    </p>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #fff;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Mail : {{ $mail }}
                    </p>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #fff;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Phone : {{ $phone }}
                    </p>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #fff;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Company Name : {{ $company_name }}
                    </p>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #fff;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Sector : {{ $sector }}
                    </p>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #fff;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Description : {{ $description }}
                    </p>
                    <p style="
                        margin: 5px 0 0 0;
                        color: #fff;
                        font-family : Arial, sans-serif;
                        font-size: 14.5px;
                        font-weight: 500;
                        font-style: normal;
                        letter-spacing: normal;
                        line-height: 1.303;
                        ">
                        Goals : {{ $goals }}
                    </p>
                </td>
            </tr>
        </table>
    @endcomponent
@endsection