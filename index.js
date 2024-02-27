const express = require('express');
const bodyParser = require('body-parser')

const app = express();

//app.use(express.json());
app.use(bodyParser.text());

//Routes
app.post('/', (rq,rs)=>{

    const data = rq.body
    const asns =[];

    const rows = data.split(/\r?\n/);

    rows.forEach(row => {
        if (row){
            const fields = row.split('\t')
            const po = fields[0]*1
            const trip = fields[1]
            const container = fields[2]
            const inicial = fields[3]
            const final = fields[4]
            const skuVal =fields[5]
            const uxb= fields[8]*1
            const asn = asns.find(asn => asn.Viaje===trip && asn.Contenedor===container);
            if (!asn){
                asns.push({
                    Viaje:trip,
                    Contenedor: container,
                    ocs:[
                        {
                            oc:po,
                            skus:[
                                {
                                    sku:skuVal,
                                    rangos:[
                                        {
                                            inicial,
                                            final,
                                            uxb
                                        }
                                    ]
                                }
                            ]
    
                        }
                    ]
                })
            }else{
                //Ocs
                const ocResult  = asn.ocs.find(oc => oc.oc === po)
                if (!ocResult){
                    asn.ocs.push(
                        {
                            oc:po,
                            skus:[
                                {
                                    sku:skuVal,
                                    rangos:[
                                        {
                                            inicial,
                                            final,
                                            uxb
                                        }
                                    ]
                                }
                            ]
    
                        }
                    )
                }else{
                    const skuResult = ocResult.skus.find(sku => sku.sku === skuVal)
                    if (!skuResult){
                        ocResult.skus.push({
                            sku:skuVal,
                            rangos:[
                                {
                                    inicial,
                                    final,
                                    uxb
                                }
                            ]
                        })
                    }else{
                        skuResult.rangos.push({
                            inicial,
                            final,
                            uxb
                        })
    
                    }
                }
            }
    
        }
    });

    rs.json(asns);
})

//Listener
app.listen(3000, ()=>{
    console.log("Listen in port 3000");
});