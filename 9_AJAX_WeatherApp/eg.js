function check()
{
    const city=document.getElementById("inputValue").value.trim().toLowerCase();

    const xhr= new XMLHttpRequest();
    xhr.open("GET","weather.json",true);
    xhr.onload=function()
    {
        if(this.status===200)
        {
            const data=JSON.parse(this.responseText);
            const citydata=data.cities.find(c=>c.name===city);
            const responseDiv=document.getElementById("result");
            if(citydata)
            {
                responseDiv.innerHTML=
                `<strong>${citydata.name}</strong><br>
                <p>${citydata.humidity}</p>`;
            }
            else
            {
                responseDiv.innerHTML=`no such city found`;
            }
        }
    };
    xhr.send();
}