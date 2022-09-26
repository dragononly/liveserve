import mongoose from 'mongoose';

main().catch(err => console.log(err));
async function main() {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('数据库连接成功');
        
    } catch (error) {
        console.log("数据库连接失败");
        
    }
   

}
export default mongoose