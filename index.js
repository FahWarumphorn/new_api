const { Client } = require('pg');
const express = require('express');
const app = express();
const cors = require('cors')

// Database connection configuration
const dbConfig = {
	user: 'D42jFZ9k',
	password: 'bHmv84EgGpRQ',
	host: '172.21.1.106',
	port: '5432',
	database: 'f8UhKXRd',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

var bodParser = require('body-parser')
var jsonParser = bodParser.json()




app.use(cors());
app.use(express.json());


// Connect to the database
client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');

        // client.query('SELECT * FROM timesheet_mdt_employee', (err, result) => {
		// 	if (err) {
		// 		console.error('Error executing query', err);
		// 	} else {
		// 		console.log('Query result:', result.rows);
		// 	}

		// 	// Close the connection when done
		// 	client
		// 		.end()
		// 		.then(() => {
		// 			console.log('Connection to PostgreSQL closed');
		// 		})
		// 		.catch((err) => {
		// 			console.error('Error closing connection', err);
		// 		});
		// });

	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});


//    EX. managment/ Product   //
//========================== GET ==============================//

// //user
app.get('/userall', (req, res) => {
    client.query("SELECT * FROM timesheet_mdt_employee ", (err, result) => {
        if (err) {
            //console.log(port);
            return res.json({ Message: "Error inside server" }); } else {
            res.send(result);
        } });

    	
		
});


//Activity
app.get('/activityAll', (req, res) => {
    client.query("SELECT * FROM timesheet_mdt_activity", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// //employees
app.get('/employees', (req, res) => {
    client.query("SELECT * FROM timesheet_mdt_employee WHERE Status = 'AC'", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
        }
    });
});

// //department EXP.Marketting
app.get('/department', (req, res) => {
    client.query("SELECT * FROM timesheet_mdt_department WHERE Status = 'AC'", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
        }
    });
});

// //Section EXP.DEV
app.get('/section', (req, res) => {
    client.query("SELECT * FROM timesheet_mdt_section WHERE Status = 'AC'", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
        }
 }); 
});


// //Activity
app.get('/TransctionAll', (req, res) => {
    client.query("SELECT * FROM timesheet_ts_emp_team WHERE Status = 'AC' ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// //TeamAll
app.get('/TeamAll', (req, res) => {
    client.query("SELECT a.id ,empCode,empUserName,empNickName,empEmail,a.Status  FROM timesheet_ts_emp_team AS a LEFT JOIN (SELECT * FROM timesheet_mdt_employee) AS b ON a.ts_userId = b.empCode WHERE a.Status = 'AC'", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
        }
    });
});

// //Select Project By Permission
app.get('/ProjectByPermission/:id', (req, res) => {
    const id = req.params.id;
    
    client.query("SELECT ts_productId,ts_productDesc,ProjectCode,ProjectDesc FROM timesheet_ts_emp_product AS a LEFT JOIN  (SELECT * FROM timesheet_ts_project) b ON a.ts_productId = b.ProductId WHERE  a.ts_userId = $1 AND a.status = 'AC' ", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(result.rows);
            res.send(result.rows);
        }
    });
});

// //select Activity
app.get('/Activity', (req, res) => {
    const id = req.params.id;
    client.query("SELECT id,ActivityCode,ActivityDesc,ActivityCharge " +
                 "FROM timesheet_mdt_activity where Status = 'AC'",

        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result.rows);
            }
        });
});



// //Transaction By Id
app.get('/Team/:id', (req, res) => {
    //var transId = _.get(req, ["body", "id"]);
    const id = req.params.id;

    //console.log(req.params.id)
    client.query("SELECT * FROM timesheet_ts_emp_team where id = $1 ", [id],
        (err, data, fil) => {
            // console.log(data)

            // if (err) {
            //     console.error('Error executing MySQL query: ', err);
            //     res.status(500).json({ err: 'Internal Server Error' }); return;

            // }
            // if (data.length === 0) {

            //     res.status(404).json({ err: 'User not found' });

            // } else {
            //     return res.status(200).json({
            //         RespCode: 200,
            //         RespMessage: 'success',
            //         Status:'OK',
            //         Log: 0,
            //         item: data
            //     })

            // }
           // console.log(data.rows);
            if (err) {
                console.log("ERR", err);
            } else {
                
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'success',
                    Status: 'OK',
                    Log: 0,
                    data: data.rows[0]
                })

            }

            


        }

    )


});


// //productAll
app.get('/productAll', (req, res) => {
    client.query("SELECT * FROM timesheet_mdt_product WHERE Status = 'AC'", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
            //console.log(result);

        }
    });
});


// //Product By Id
app.get('/product/:id', (req, res) => {
    //var transId = _.get(req, ["body", "id"]);
    const id = req.params.id;


    client.query("SELECT * FROM timesheet_mdt_product where id = $1 ", [id],
        (err, data, fil) => {
           
            if (err) {
                console.log("ERR", err);
            } else {
                //console.log(data);
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'success',
                    Status: 'OK',
                    Log: 0,
                    data: data.rows[0]
                })

            }
        }

    )


});

// // //UserRegister
// // app.get('/UserRegister', (req, res) => {
// //     db.query("SELECT * FROM timesheet_mdt_product WHERE Status = 'AC'", (err, result) => {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             res.send(result);
// //             //console.log(result);

// //         }
// //     });
// // });



// // //UserRegister
// app.get('/UserRegister', (req, res) => {
//     db.query("SELECT a.id AS 'id', ts_userId,empUserName,a.status FROM wha.timesheet_ts_emp_team AS a LEFT JOIN (SELECT * FROM wha.timesheet_mdt_employee) AS b ON a.ts_userId = b.empCode WHERE a.status = 'AC' ", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//             console.log(result);

//         }
//     });
// });


// //CREATE [Product]
app.get('/UserRegister', (req, res) => {
    client.query("SELECT a.id , ts_userId,empUserName,a.status FROM timesheet_ts_emp_team AS a LEFT JOIN (SELECT * FROM timesheet_mdt_employee) AS b ON a.ts_userId = b.empCode WHERE a.status = 'AC' ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result.rows);
            //console.log(result);

        }
    });
});


// //Product By Id
app.get('/productUser/:id', (req, res) => {
    //var transId = _.get(req, ["body", "id"]);
    const id = req.params.id;
    client.query(" SELECT productcode FROM timesheet_mdt_product WHERE Status = 'AC'  AND id  = $1 ", [id],
        (err, result) => {

            if (err) {
                console.log("ERR", err);
            } else {
                //console.log(result.rows[0].productcode)
               if (result != '') {
                    client.query("SELECT a.id  , empusername  FROM timesheet_ts_emp_product AS a LEFT JOIN (SELECT empcode,empusername FROM timesheet_mdt_employee) AS b ON a.ts_userid = b.empcode WHERE a.ts_productid = $1 AND a.status = 'AC' ", [result.rows[0].productcode],
                    (err, result) => {

                        if (err) {
                            console.log("ERR", err);
                        } else {
                           // console.log(result);
                            // return res.status(200).json({
                            //     RespCode: 200,
                            //     RespMessage: 'success',
                            //     Status: 'OK',
                            //     Log: 0,
                            //     data: data
                            // })

                           res.send(result.rows);

                            //console.log(result)
                        }
                    }

                )
                }
            }
        }

    )

});


//Product By Id
app.get('/transactionById', (req, res) => {

    const id = req.query.username;
    const dateInput = req.query.dateInput;

   
    //console.log(req.query);
    //check holiday 
   client.query("SELECT DateDetails FROM view_timesheet_mdt_holiday WHERE DateCheck = $1  "

        , [dateInput], (err, result) => {
           // console.log(result.rows.length);
           
            var num;
            if (err) {
                console.log("ERR", err);
            } else {
               //console.log("lenght:"+result.length);
                if (result.rows.length > 0) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'Success',
                        Status: 'OK',
                        Details: 'Holiday',
                        Log: 0,
                        data: result,
                        countHour: 0
                    })
                }
                else {
                    client.query("SELECT ts_projectId,ts_activityId,ts_hour,ts_description,ts_location,ts_reject FROM timesheet_transaction  " +
                        " WHERE ts_userId = $1 AND ts_dateInput = $2 AND Status = 'AC' "

                        , [id, dateInput], (err, result) => {

                            if (err) {
                                console.log("ERR", err);
                            } else {
                                num = 0;
                                result.rows.forEach((item) => {
                                    num += item.ts_hour;

                                    //console.log(num)
                                });
                                var total = num;
                                // console.log("+++++"+total)
                                return res.status(200).json({
                                    RespCode: 200,
                                    RespMessage: 'Success',
                                    Status: 'OK',
                                    Details: '',
                                    Log: 0,
                                    data: result.rows,
                                    countHour: total,
                                })
                            }
                        }

                    )

                }
            }
    }

    )
});


// //TransAllBymonth
// app.get('/TransAllBymonth', (req, res) => {

//     const username = req.query.username;
//     const dateInput = req.query.dateInput;
//     const monthInput = req.query.monthInput;

//     // username = 'EMP001';
//     // monthInput = '2024-02';
//     // console.log(username);
//     // console.log(monthInput);
//     db.query("SELECT a.id  AS id, DATE_FORMAT(ts_dateInput,'%a %d') AS v_date," +
//         "       DATE_FORMAT(ts_dateInput,'%M %Y') AS v_Formatdate, " +
//         "       CONCAT(c.projectCode, ':', c.projectDesc) AS v_projectCode,  " +
//         "       c.projectDesc AS v_projectDesc, " +
//         "       ts_description  AS v_description, " +
//         "       ts_hour AS v_hour, " +
//         "       ts_location AS v_location, " +
//         "       ts_status  AS v_status, " +
//         "       ts_reject AS v_reject, " +
//         "       appr1_userId AS v_app1_userId, " +
//         "       appr1_userName  AS v_app1_userName, " +
//         "       DATE_FORMAT(appr1_Credate, '%Y-%m-%d')  AS v_app2_Credate, " +
//         "       appr2_userId AS v_app2_userId, " +
//         "       DATE_FORMAT(appr2_Credate, '%Y-%m-%d')  AS v_app2_Credate, DATE_FORMAT(ts_dateInput,'%Y-%m-%d') AS v_date_month  " +
//         "       FROM view_timesheet_transaction AS a " +
//         "       LEFT JOIN view_timesheet_mdt_activity AS b ON a.ts_activityId = b.ActivityCode " +
//         "       LEFT JOIN view_timesheet_ts_project AS c ON a.ts_projectId = c.projectCode" +
//         "       WHERE ts_userId = ? AND DATE_FORMAT(ts_dateInput,'%Y-%m') = ?"
//         ,

//         [username, monthInput],
//         (err, result) => {
//             if (err) {
//                 console.log("ERR", err);
//             } else {
//                 // หา store procudure ต่อ
//                 var dateQuery = monthInput + "-01";
//                 db.query("SELECT DAYOFMONTH(LAST_DAY(?)) AS 'day_month',COUNT(DateCheck) AS 'day_holiday', " +
//                     "         DAYOFMONTH(LAST_DAY(?))*8  AS 'totalHour_month'," +
//                     "         COUNT(DateCheck)*8 AS 'totalHour_holiday' , " +
//                     "         (DAYOFMONTH(LAST_DAY(?))*8) -  COUNT(DateCheck)*8   AS 'totalHour_work' " +
//                     "          FROM view_timesheet_mdt_holiday WHERE  DATE_FORMAT(DateCheck, '%Y-%m') = ?  ",
//                     [dateQuery, dateQuery, dateQuery, monthInput],
//                     (err, data) => {
//                         if (err) {
//                             console.log("ERR", err);
//                         } else {

//                             db.query("SELECT sum(ts_hour) AS sum_hour FROM view_timesheet_transaction WHERE DATE_FORMAT(ts_dateInput, '%Y-%m') = ? AND ts_userId = ? ",
//                                 [monthInput, username],
//                                 (err, TransData) => {

//                                     if (err) {
//                                         console.log("ERR", err);
//                                     } else {
//                                         //console.log(TransData.sum_hour)
//                                         return res.status(200).json({
//                                             RespCode: 200,
//                                             RespMessage: 'success',
//                                             Status: 'OK',
//                                             Log: 0,
//                                             TotalMonthHour_work: data[0].totalHour_work,
//                                             TotalTransHour_work: TransData[0].sum_hour,
//                                             result: result
//                                         })
//                                     }



//                                 })


//                         }


//                     })



//                 //res.send(result);
//             }
//         }

//     )
// });





// //================================= POST ===========================//

// //user
app.post('/login', (req, res) => {
    
    client.query("SELECT * FROM timesheet_mdt_employee where empEmail = $1 AND empPassword = $2", [req.body.username, req.body.password],
        (err, result) => {
            
            if (err) {

                return res.json({ Message: "Error inside server" });

            } else {
                // res.send(result);
                //console.log(req.body.username+"-"+req.body.password);
                //console.log(result);
                return res.status(200).json({
                    status: "ok",
                    message: "Logged in",
                    // accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imthcm4ueW9uZ0BtZWxpdmVjb2RlLmNvbSIsImlhdCI6MTcwNjYwNjI3NCwiZXhwIjoxNzA2NjA2MzM0fQ.rIqJYjEn0qdW6Sn3Ogl3e51NJoFgdiEWZfn98Y8jccU,
                    expiresIn: 60000,
                    RespCode: 200,
                    RespMessage: 'success',
                    Log: 0,
                    user: result.rows[0]
                    
                })
                
               

            }
            // if(result.length > 0){
            //     // const name = result[0].name;
            //     // const token = jwt.sign({name},"our-jsonwebtoken-secret-key",{expiresIn:'1d'});
            //     // res.cookie('token',token);
            //     // console.log(name);
            //     return res.json({Login:true})
            // }else
            // {
            //     return res.json({Login:false})
            // }
            // if (result.length === 0) {

            //     res.status(404).json({ err: 'User not found' });

            // } else {

            //     return res.status(200).json({

            //         RespCode: 200,
            //         RespMessage: 'success',
            //         Log: 0,
            //         item: data
            //     })

            // }
        });
});




//Transaction By Id
// app.get('/transactionById/:id', (req, res) => {
//     //var transId = _.get(req, ["body", "id"]);
//     const id = req.params.id;

//     try {
//         client.query("SELECT * FROM timesheet_transsaction where id = ? ", [id],
//             (err, data, fil) => {
//                 console.log(data)

//                 if (err) {
//                     console.error('Error executing MySQL query: ', err);
//                     res.status(500).json({ err: 'Internal Server Error' }); return;

//                 }
//                 if (data.length === 0) {

//                     res.status(404).json({ err: 'User not found' });

//                 } else {
//                     return res.status(200).json({
//                         RespCode: 200,
//                         RespMessage: 'success',
//                         Log: 0,
//                         item: data
//                     })

//                 }


//             }

//         )

//     } catch (error) {
//         console.log('ERR 0! :', error)
//         return res.status(500).json({
//             RespCode: 500,
//             RespMessage: 'No bad',
//             Log: 0
//         })

//     }


// });




// // //Login 
// // app.post("/auth/login", (req, res) => {
// //     const { name, password } = req.body

// //     //find user 
// //     const user = users.findIndex((e) => e.name === name)

// //     if (!name || user < 0) {
// //         return res.send(400)
// //     }

// //     const access_token = jwtGenerate(users[user])
// //     const refresh_token = jwtRefreshTokenGenerate(users[user])

// //     users[user].refresh = refresh_token

// //     res.json({
// //         access_token,
// //         refresh_token,
// //     })
// // })





// //POST userall
// app.post('/create', (req, res) => {
//     const username = req.body.username;
//     const lastname = req.body.lastname;
//     const email = req.body.email;
//     const department = req.body.department;
//     const sts = 1;

//     db.query("INSERT INTO userall (username, lastname, email, department,sts) VALUES (?,?,?,?,?)",
//         [username, lastname, email, department, sts],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("Values interted");
//             }
//         })
// });


// //======================================== POST ================================================

// //POST 
// app.post('/createTransaction', (req, res) => {
//     // const UserInput = 'EMP0001'
//     // const userId = req.body.username;
//     // const dateInput = req.body.lastname;
//     // const email = req.body.email;
//     // const department = req.body.department;
//     // const sts = 1;

//     const { UserInput, dateInput, projectId, activityId, hours, desciption } = req.body

//     //console.log(req.body.UserInput)

//     db.query("INSERT INTO timesheet_transsaction (ts_userId, ts_dateInput, ts_projectId, ts_ActivityId,ts_hour,ts_description) VALUES (?,?,?,?,?,?)",
//         //db.query("INSERT INTO timesheet_mdt_section (Section_Desc, Status, Update_userId, Update_Datetime) VALUES (?,?,?,?)",
//         [UserInput, dateInput, projectId, activityId, hours, desciption],


//         (err, result) => {

//             console.log(result)

//             if (err) {
//                 console.log(err);
//             } else {

//                 //console.log(result.insertId)

//                 res.send("Insert Success");
//                 return res.status(200).send({
//                     status: 'success',
//                     data: result.insertId,
//                 });


//             }
//         })



// });

// //POST
// app.post('/createTransaction1', (req, res) => {
//     const UserInput = 'EMP0001'
//     const location = req.body.location;
//     const description = req.body.description;
//     const dateInput = req.body.dateInput;
//     const hours = req.body.hours;
//     const projectId = req.body.projectId;
//     const activityId = req.body.activityId;
//     //const status_trans = req.body.status_trans;
//     const status_trans = 'W'
//     const status = 'AC';

//     //const {userId,location,description,dateInput,hours,projectId,status,activityId} = req.body

//     console.log(req.body.dateInput)

//     db.query("INSERT INTO timesheet_transsaction (ts_userId,ts_location,ts_description,ts_dateInput,ts_hour,ts_projectId,ts_status,ts_activityId,status) VALUES (?,?,?,?,?,?,?,?,?)",
//         [UserInput, location, description, dateInput, hours, projectId, status_trans, activityId, status],
//         (err, result) => {
//             console.log(result)
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("Insert Success");
//                 //   return res.status(200).send({
//                 //      status: 'success',
//                 //      data: result.insertId,
//                 //    });


//             }
//         })

// });


//Team Employee
app.post('/createTeam', (req, res) => {
    const username = req.body.username;
    const department = req.body.department;
    const section = req.body.section;
    const level = req.body.level;
    const createDatetime = req.body.createDatetime;
    const createUserId = req.body.createUserId;

    //const {userId,location,description,dateInput,hours,projectId,status,activityId} = req.body

    //console.log(req.body.createDatetime)

    client.query("INSERT INTO timesheet_ts_emp_team (ts_userId,ts_deptId,ts_section,ts_Level,Status,Create_userId,Create_Datetime,Update_userId,Update_Datetime) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [username, department, section, level, 'AC', createUserId, createDatetime, createUserId, createDatetime],
        (err, result) => {
            console.log(result)
            if (err) {
                console.log(err);
            } else {
                // res.send("Insert Success");
                return res.status(200).send({
                    status: 'ok',
                    data: result.insertId,
                });


            }
        })

});


// //User Register [Product]
app.post('/createRegisProduct', (req, res) => {
    const username = req.body.username; //ts_userId
    const productId = req.body.productId; //ts_productId
    const productDesc = req.body.productDesc; //ts_productDesc
    const createUserId = req.body.createUserId; // Create_userId
    const createDatetime = req.body.createDatetime;

    console.log(req.body)

    client.query("INSERT INTO timesheet_ts_emp_product (ts_userId,ts_productId,ts_productDesc,Status,Create_userId,Create_Datetime,Update_userId,Update_Datetime) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [username, productId, productDesc, 'AC', createUserId, createDatetime, createUserId, createDatetime], (err, result) => {
           // console.log(result)
            if (err) {
                console.log(err);
            } else {
                // res.send("Insert Success");
                return res.status(200).send({
                    status: 'ok',
                    data: result.insertId,
                });


            }
        })

});


// //Add Transaction
app.post('/createActual', (req, res) => {

    //const productId = [] 

    const username = req.body.username; //ts_userId
    const dateInput = req.body.dateInput; //ts_userId
    const transaction = req.body.item; //ts_productDesc
    const length = req.body.item.length;
    const createUserId = req.body.createUserId;
    const createDatetime = req.body.createDatetime;



    client.beginTransaction((err) => {

        if (err) {
            throw err
        }

        transaction.forEach((item) => {
            client.query("INSERT INTO timesheet_transaction (ts_userId,ts_dateInput,ts_productId,ts_productDesc,ts_projectDesc,ts_activityDesc,ts_projectId,ts_activityId,ts_hour,ts_description,ts_location,Status,Create_userId,Create_Datetime,ts_status) " +
                "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11$12,$13,$14,$15)",
                [username, dateInput, '', '', '', '', item.project, item.activity, item.hours, item.description, item.location, 'AC', createUserId, createDatetime, "W"]
                //[username, dateInput, '', '', '', '', transaction.map(employee => ['', '', employee.project, '', employee.activity, '', employee.hours, employee.desciption, employee.lo]), 'AC', createUserId, createDatetime, 'W']

                , (err, result) => {
                    //console.log(result)
                    if (err) {

                        return res.status(500).send({
                            status: 'not complete',
                            data: err,
                        });

                    }
                })
        });

        // res.send("Insert Success");
        return res.status(200).send({
            status: 'ok',
            data: "Insert Success",
        });





    });
});










// //=================================================== PUT =========================================//
// // PUT 
// app.put('/transaction/:id', (req, res) => {
//     const updateIndex = users.findIndex(user => user.id === Number(req.params.id))
//     res.send(`Update user id: '${users[updateIndex].id}' completed.`)
// })






// //PUT
// app.put('/update', (req, res) => {
//     const id = reg.body.id;
//     const username = req.body.username;


//     db.query("UPDATE userall SET username = ? WHERE id= ?", [username, id], (err, result) => {
//         if (err) {
//             console.log(err + "errrrrrrrrr");
//         } else {
//             res.send(result);
//         }
//     });
// });




// //UPDATE Status Submit 
// app.put('/updateSubmit', (req, res) => {


//     const username = req.body.username;
//     const dateInput = req.body.dateInput; //2024-02
//     const updateUserId = req.body.updateUserId;
//     const updateDatetime = req.body.updateDatetime;


//     console.log(req.body)

//     db.query("UPDATE timesheet_transaction  SET ts_status = 'A1'  ,Update_userId = ? ,  UpDate_Datetime = ? WHERE ts_userId = ? AND status = 'AC' AND  DATE_FORMAT(ts_dateInput,'%Y-%m') = ?",
//         [username, updateDatetime, updateUserId, dateInput], (err, result) => {
//             if (err) {
//                 console.log(err + "errrrrrrrrr");
//             } else {
//                 return res.status(200).send({

//                     status: 'Update Success',
//                     length: result.length,
//                     data: result
//                 });

//             }
//         });
// });



// // ====================================== DELETE =================================//

app.put('/deleteUserTeam', (req, res) => {
    const id = req.body.id;
    const updateUserId = req.body.updateUserId;
    const updateDatetime = req.body.updateDatetime;

   console.log("===");

    client.query("Update timesheet_ts_emp_team  SET Status = 'RS' , Update_userId = $1 , update_Datetime = $2 WHERE id= $3 ", [updateUserId, updateDatetime, id], (err, result) => {
        if (err) {
            console.log(err + "errrrrrrrrr");
        } else {
            res.send(result);

        }
    });
});

// //Product By User
app.put('/deleteUserProduct', (req, res) => {
    const id = req.body.id;
    const updateUserId = req.body.updateUserId;
    const updateDatetime = req.body.updateDatetime;

    client.query("Update  timesheet_ts_emp_product  SET Status = 'RS' , update_UserId  = $1 , update_Datetime = $2 WHERE id= $3 ", [updateUserId, updateDatetime, id], (err, result) => {
        if (err) {
            console.log(err + "errrrrrrrrr");
        } else {
            res.send(result.rows);

        }
    });
});


// //PUT UserByTeam
// app.put('/updateUserByTeam', (req, res) => {
//     const id = req.body.id;
//     const username = req.body.username;
//     const department = req.body.department;
//     const level = req.body.level;
//     const section = req.body.section;
//     const updateUserId = req.body.updateUserId;
//     const updateDatetime = req.body.updateDatetime;

//     db.query("UPDATE timesheet_ts_emp_team SET ts_userId = ? , ts_deptId = ? ,ts_level = ?,ts_section =? , update_userId = ?  , update_Datetime = ? WHERE id= ?",
//         [username, department, level, section, updateUserId, updateDatetime, id], (err, result) => {
//             if (err) {
//                 console.log(err + "errrrrrrrrr");
//             } else {
//                 res.send(result);
//             }
//         });
// });


// //Delete  Transaction BY Id  before check insert new transaction
// app.put('/DeleteTransactionByDay', (req, res) => {

//     const username = req.body.username; //ts_userId
//     const dateInput = req.body.dateInput; //ts_userId
//     const transaction = req.body.item; //ts_productDesc
//     const length = req.body.item.length;
//     const createUserId = req.body.createUserId;
//     const createDatetime = req.body.createDatetime;

//     db.query("UPDATE timesheet_transaction SET Status = 'RS' WHERE ts_userId = ? AND ts_dateInput = ? ",
//         [username, dateInput], (err, result) => {
//             if (err) {
//                 console.log(err + "errrrrrrrrr");
//             } else {


//                 // res.send(result);
//                 transaction.forEach((item) => {
//                     db.query("INSERT INTO timesheet_transaction (ts_userId,ts_dateInput,ts_productId,ts_productDesc,ts_projectDesc,ts_activityDesc,ts_projectId,ts_activityId,ts_hour,ts_description,ts_location,Status,Create_userId,Create_Datetime,ts_status) " +
//                         "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//                         [username, dateInput, '', '', '', '', item.project, item.activity, item.hours, item.description, item.location, 'AC', createUserId, createDatetime, "W"]
//                         //[username, dateInput, '', '', '', '', transaction.map(employee => ['', '', employee.project, '', employee.activity, '', employee.hours, employee.desciption, employee.lo]), 'AC', createUserId, createDatetime, 'W']

//                         , (err, result) => {
//                             //console.log(result)
//                             if (err) {

//                                 return res.status(500).send({
//                                     status: 'not complete',
//                                     data: err,
//                                 });

//                             }
//                         })


//                 });

//             }

//             return res.status(200).send({
//                 status: 'ok',
//                 data: "Insert Success",
//             });
//         });

// });










app.listen('3003', jsonParser, () => {
    console.log('Server is runing on port 3003');
    
})


//postgres
// const {Client} = require('pg');

// const client = new Client ({
//     host: "localhost",
//     user: "postgres",
//     port: "5432",
//     password: "1995",
//     database: "Employees",

// });

// client.connect();


// client.query('SELECT * FROM cars', (err,result) =>{
//             if(err){
//                 console.log(err);
//             }else
//             {
//                 res.send(result);
//             }
//             client.end();
//         });