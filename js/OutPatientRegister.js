window.onload = function () {
    var mainInput = document.getElementById("nepali-datepicker");
    var temp = mainInput.value;
    mainInput.value = "";
    mainInput.nepaliDatePicker({
        readOnlyInput: true,
        disableAfter: CurrentDateBs,
        ndpYear: true,
        ndpMonth: true
    });
    if (temp == "") {
        mainInput.value = CurrentDateBs;
    }
    else {
        mainInput.value = temp;
    }
}

$('#MasterRegisterId').on('change', function () {
    clearTimeout($(this).data('timer'));
    $(this).data('timer', setTimeout(function () {
        //do stuff when user has been idle for 1 secs
        debugger
        var Mid = $('#MasterRegisterId').val();

        $.ajax({
            type: "GET",
            url: "/CommonForms/GetPatientInfoFromMID",
            data: { MId: Mid },
            success: function (data) {
                debugger
                $('#PatientInfo_PatientId').val(data.PatientId);

                $('#PatientInfo_FirstName').val(data.FirstName);
                $('#PatientInfo_LastName').val(data.LastName);
                $('#PatientInfo_Age').val(data.Age);
                $('#PatientInfo_ContactNumber').val(data.ContactNumber);
                $('#PatientInfo_WardId').val(data.WardId);
                $('#PatientInfo_Sex').val(data.Sex);
                $('#PatientInfo_ReligionId').val(data.ReligionId);
                $('#PatientInfo_Tole').val(data.Tole);
                $('#PatientInfo_DistrictId').val(data.DistrictId);

                $('.local-government-type')[0].selectedIndex = 0;
                $('.local-government-type').css('visibility', 'visible');

                if (data.VDCId == null) {
                    $('.local-government-type').val(1);

                    $.ajax({
                        type: "GET",
                        url: "/CommonForms/GetMunicipalities",
                        data: { districtId: data.DistrictId },
                        async: false,
                        success: function (data) {
                            var municipality = '<option value="-1">Select Municipality</option>';
                            for (var i = 0; i < data.length; i++) {
                                municipality += '<option value="' + data[i].MunicipalityId + '">' + data[i].EnglishMunicipalityName + '</option>';
                            }
                            $('.municipal-dd').html(municipality);
                        }
                    });
                    $('.municipal-dd').show();
                    $('.municipal-dd').val(data.MunicipalityId);
                    $('.vdc-dd option:selected').val(null);
                    $('.vdc-dd').hide();
                }
                else {
                    $('.local-government-type').val(2);

                    $.ajax({
                        type: "GET",
                        url: "/CommonForms/GetVDCs",
                        data: { districtId: data.DistrictId },
                        async: false,
                        success: function (data) {
                            var vdc = '<option value="-1">Select Local Government</option>';
                            for (var i = 0; i < data.length; i++) {
                                vdc += '<option value="' + data[i].VDCId + '">' + data[i].VDCNameInEnglish + '</option>';
                            }
                            $('.vdc-dd').html(vdc);
                        }
                    });
                    $('.vdc-dd').show();
                    $('.vdc-dd').val(data.VDCId);
                    $('.municipal-dd option:selected').val(null);
                    $('.municipal-dd').hide();

                }
            }
        });

    }, 1000));
})

$('.isFirstTimeCheckbox').on('change', function () {
    debugger
    if ($(this).is(":checked")) {
        $('.isFirstTimeInput').hide();
    }
    else {
        $('.isFirstTimeInput').val("");

        $('.isFirstTimeInput').show();
    }
})

$('.district-dd').on('change', function () {
    debugger
    $('.local-government-type')[0].selectedIndex = 0;
    $('.local-government-type').css('visibility', 'visible');
    $('.municipal-dd').hide();
    $('.vdc-dd').hide();
    $('#LocalGovernment').val(null);
    $('#BranchNameInNepali').val(null);
});

$('.local-government-type').on('change', function () {
    var districtId = $('.district-dd option:selected').val();
    if ($('.local-government-type option:selected').val() == 0) {
        $('.municipal-dd').hide();
        $('.vdc-dd').hide();
    }
    else if ($('.local-government-type option:selected').val() == 1) {
        $.ajax({
            type: "GET",
            url: "/CommonForms/GetMunicipalities",
            data: { districtId: districtId },
            success: function (data) {
                var municipality = '<option value="-1">Select Municipality</option>';
                for (var i = 0; i < data.length; i++) {
                    municipality += '<option value="' + data[i].MunicipalityId + '">' + data[i].EnglishMunicipalityName + '</option>';
                }
                $('.municipal-dd').html(municipality);
            }
        });
        $('.municipal-dd').show();
        $('.vdc-dd option:selected').val(null);
        $('.vdc-dd').hide();
    }
    else {
        $.ajax({
            type: "GET",
            url: "/CommonForms/GetVDCs",
            data: { districtId: districtId },
            success: function (data) {
                var vdc = '<option value="-1">Select Local Government</option>';
                for (var i = 0; i < data.length; i++) {
                    vdc += '<option value="' + data[i].VDCId + '">' + data[i].VDCNameInEnglish + '</option>';
                }
                $('.vdc-dd').html(vdc);
            }
        });
        $('.vdc-dd').show();
        $('.municipal-dd option:selected').val(null);
        $('.municipal-dd').hide();
    }
});

$('.municipal-dd').on('change', function () {
    debugger
    var municipality = $('#.municipal-dd option:selected').text();
    if (municipality != 'Select Municipality') {
        $('#LocalGovernment').val(municipality);
        $('#BranchNameInNepali').val(municipality);
        $.ajax({
            type: "GET",
            url: "/Branch/MunicipalityNameInEnglish",
            data: { id: $('.municipal-dd').val() },
            success: function (data) {
                $('#BranchNameInEnglish').val(data);
            }
        });
    }
    else {
        $('#LocalGovernment').val(null);
        $('#BranchNameInNepali').val(null);
    }
});

$('.vdc-dd').on('change', function () {
    var vdc = $('.vdc-dd option:selected').text();
    if (vdc != 'Select Rural Municipality') {
        $('#LocalGovernment').val(vdc);
        $('#BranchNameInNepali').val(vdc);
        $.ajax({
            type: "GET",
            url: "/Branch/VDCNameInEnglish",
            data: { id: $('.vdc-dd').val() },
            success: function (data) {
                $('#BranchNameInEnglish').val(data);
            }
        });
    }
    else {
        $('#LocalGovernment').val(null);
        $('#BranchNameInNepali').val(null);
    }
});

$('.transfered-status').on('change', function () {
    debugger
    if ($(this).val() == 1) {
        $('.transfered-to').val("");
        $('.transfered-from').show();
        $('.transfered-to').hide();
    }
    else if ($(this).val() == 2) {
        $('.transfered-from').val("");
        $('.transfered-to').show();
        $('.transfered-from').hide();
    }
    else {
        $('.transfered-from').hide();
        $('.transfered-to').hide();

    }
})
