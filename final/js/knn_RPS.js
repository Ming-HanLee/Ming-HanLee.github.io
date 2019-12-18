async function app() {
    console.log('Loading mobilenet..');

    const webcamElement = document.getElementById('webcam');
    const classifier = knnClassifier.create();

    let net;

    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');

    // Create an object from Tensorflow.js data API which could capture image 
    // from the web camera as Tensor.
    const webcam = await tf.data.webcam(webcamElement);

    // Reads an image from the webcam and associates it with a specific class
    // index.
    const addExample = async classId => {
        // Capture an image from the web camera.
        console.log('Adding Example to Classifier');
        const img = await webcam.capture();
        const vid = document.querySelector('#webcam');

        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        const activation = net.infer(img, 'conv_preds');

        // Pass the intermediate activation to the classifier. 
        // Labeling. When the classifier sees this pattern of activation, it knows its classId.
        classifier.addExample(activation, classId);

        // Draw vid to canvas, then convert it to <img>
        var canvas = document.createElement('canvas');
        canvas.height = vid.height;
        canvas.width = vid.width;
        if (canvas.getContext) {
            canvas.getContext('2d').drawImage(vid, 0, 0, vid.width, vid.height);
        } else {
            alert("Your browser doesn't support HTML5 canvas");
        }

        // Put the <img> to the right place
        if (classId == 0) {
            $('#rock-img').attr('src', canvas.toDataURL('image/jpeg'));
            $('#rock-text').val(Number($('#rock-text').val()) + 1);
            if ($('#rock-text').val() >= 50)
                $('#rock-text').text("Sample Size: " + $('#rock-text').val() + "\n" + "Well done! You're ready to go!");
            else if ($('#rock-text').val() >= 25)
                $('#rock-text').text("Sample Size: " + $('#rock-text').val() + "\n" + "That's probably enough, but 50 samples will be better!");
            else
                $('#rock-text').text("Sample Size: " + $('#rock-text').val() + "\n" + "Add more samples!");
            $('#rock-text').html($('#rock-text').html().replace(/\n/, '<br/>'));
        } else if (classId == 1) {
            $('#scissors-img').attr('src', canvas.toDataURL('image/jpeg'));
            $('#scissors-text').val(Number($('#scissors-text').val()) + 1);
            if ($('#scissors-text').val() >= 50)
                $('#scissors-text').text("Sample Size: " + $('#scissors-text').val() + "\n" + "Well done! You're ready to go!");
            else if ($('#scissors-text').val() >= 25)
                $('#scissors-text').text("Sample Size: " + $('#scissors-text').val() + "\n" + "That's probably enough, but 50 samples will be better!");
            else
                $('#scissors-text').text("Sample Size: " + $('#scissors-text').val() + "\n" + "Add more samples!");
            $('#scissors-text').html($('#scissors-text').html().replace(/\n/, '<br/>'));
        } else if (classId == 2) {
            $('#paper-img').attr('src', canvas.toDataURL('image/jpeg'));
            $('#paper-text').val(Number($('#paper-text').val()) + 1);
            if ($('#paper-text').val() >= 50)
                $('#paper-text').text("Sample Size: " + $('#paper-text').val() + "\n" + "Well done! You're ready to go!");
            else if ($('#paper-text').val() >= 25)
                $('#paper-text').text("Sample Size: " + $('#paper-text').val() + "\n" + "That's probably enough, but 50 samples will be better!");
            else
                $('#paper-text').text("Sample Size: " + $('#paper-text').val() + "\n" + "Add more samples!");
            $('#paper-text').html($('#paper-text').html().replace(/\n/, '<br/>'));
        }

        // Dispose the tensor to release the memory.
        img.dispose();
        console.log('Adding Example to Classifier Completed');
    };

    // When clicking a button, add an example for that class.
    $('#class-rock').on('click', () => addExample(0));
    $('#class-scissors').on('click', () => addExample(1));
    $('#class-paper').on('click', () => addExample(2));

    $('#play').on('click', () => {
        $('#play').attr('disabled', 'disabled').html("<h3>You've made your choice!</h3>");
        console.log("Button locked");
        const vid = document.querySelector('#webcam');

        //draw vid to canvas, then convert it to <img>
        var canvas = document.createElement('canvas');
        canvas.height = vid.height;
        canvas.width = vid.width;
        if (canvas.getContext) {
            canvas.getContext('2d').drawImage(vid, 0, 0, vid.width, vid.height);
        } else {
            alert("Your browser doesn't support HTML5 canvas");
        }
        $('#play-img').attr('src', canvas.toDataURL('image/jpeg'));
        var playerno = $('#pred-console').val();
        $('#your-pick').text(playerno);
        console.log($('#cloth-remain').data('value'));
        randomRPS(playerno, Number($('#cloth-remain').data('value')));
        $('#again-div').append($('<button>').addClass('btn btn-warning').attr('id', 'again').attr('onclick', 'playAgain()').html('<h5>AGAIN</h5>'));

        // Scroll to the section
        setTimeout(() => { location.href = '#result-section'; }, 1500);
    })

    // When the user scrolls the page, execute becomeSticky
    window.onscroll = () => { becomeSticky() };

    while (true) {
        if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();

            // Get the activation from mobilenet from the webcam.
            const activation = net.infer(img, 'conv_preds');
            // Get the most likely class and confidences from the classifier module.
            const result = await classifier.predictClass(activation);

            const classes = ['Rock', 'Scissors', 'Paper'];
            $('#pred-console').text(
                "prediction:" + " " + classes[result.label] + "\n" +
                "probability:" + " " + result.confidences[result.label]
            ).val(classes[result.label]);
            $('#pred-console').html($('#pred-console').html().replace(/\n/g, '<br/>'));


            // Dispose the tensor to release the memory.
            img.dispose();
        }

        await tf.nextFrame();
    }
}

$(() => {
    console.log('JS ready');
    app();
})