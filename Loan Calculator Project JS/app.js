

//listen to submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //hide results
    document.getElementById('results').style.display='none';

    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults,2000);

    e.preventDefault();
});

function calculateResults() {
    console.log('calculating....');
    // UI Variables
    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    const monthlyPayment=document.getElementById('monthly-payment');
    const totalPayment=document.getElementById('total-payment');
    const totalInterest=document.getElementById('total-interest');
    
    const principle=parseFloat(amount.value);
    const calculateInterest=parseFloat(interest.value)/100/12;
    const calculatedPayments=parseFloat(years.value)*12;

    const x=Math.pow(1+calculateInterest,calculatedPayments);
    const monthly=(principle*x*calculateInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly*calculatedPayments).toFixed(2);

        //show results
        document.getElementById('results').style.display='block';
        //hide spinner
        document.getElementById('loading').style.display='none';
        totalInterest.value=((monthly*calculatedPayments)-principle).toFixed(2);

    }else{
        setTimeout(2000);
        showError('please check your numbers');
        document.getElementById('loading').style.display='none';
    }
}


function showError(error){
    //create a div
    const errorDiv=document.createElement('div');
    //get elements
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');



    // add class
    errorDiv.className='alert alert-danger';
    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    card.insertBefore(errorDiv,heading);

    //clear error after 3 seconds

    setTimeout(clearError,3000);
}


//clear error
function clearError(){
    document.querySelector('.alert').remove();
}