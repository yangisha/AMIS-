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
$('.isFreeCheckbox').on('change', function () {
    debugger
    if ($(this).is(":checked")) {
        $('.isFreeInput').css('display', 'none')

    }
    else {
        $('.isFreeInput').css('display', 'block')

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