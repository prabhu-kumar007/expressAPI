var express = require('express');
const auth=require('../auth/index')
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient();

/* GET users listing. */
router.use(express.json());

router.get('/',auth, async function(req, res, next) {
  const users= await prisma.users.findMany({});
  res.send(users);
});

router.post('/',async (req,res,next)=>{
  const createUser= await prisma.users.create({
    data:{
      name:req.body.name,
      email:req.body.email,
      address:req.body.address,
      contactNo:req.body.contactNo
    }
  });
  res.send(createUser);
});

router.patch('/:id',async (req,res,next)=>{
  const {id}=req.params;
  const updatedUser= await prisma.users.update({
    where:{
      id:id
    },
    data:{
      name:req.body.name,
      email:req.body.email,
      address:req.body.address,
      contactNo:req.body.contactNo
    }
  });
  res.send(updatedUser);
});

router.delete('/:id',async (req,res,next)=>{
  const {id}=req.params;
  const deleted= await prisma.users.delete({
    where:{
      id:id
    },
  });
  res.send(`User has been deleted ${id}`);
});
module.exports = router;
