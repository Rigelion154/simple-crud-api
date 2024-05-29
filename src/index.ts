import {createServer} from 'http'
import {PORT, URL_TYPES} from "./constants/appConstants";
import {getTypeUrl} from "./utils/getTypeUrl";
import UsersDatabase from "./database/usersDatabase";
import usersDatabase from "./database/usersDatabase";

const server = createServer((req, res) => {
    const urlType = getTypeUrl(req.url)
    let result: any = {}
    let chunks: any[] = []

    req.on('data', chunk => chunks.push(chunk));

    if (urlType !== URL_TYPES.INVALID) {
        req.on('end', () => {
            const data = Buffer.concat(chunks).toString('utf-8');
            const urlArray = req.url.split('/')
            const uid = urlArray[urlArray.length - 1]

            switch (req.method) {
                case 'GET' : {
                    if (urlType === URL_TYPES.USER_URL) {
                        result = UsersDatabase.getUsers()
                    }

                    if (urlType === URL_TYPES.USER_ID_URL) {
                        result = UsersDatabase.getUserById(uid)
                    }
                }
                    break;
                case 'POST':
                    result = UsersDatabase.createUser(data)
                    break;
                case 'PUT' :
                    result = usersDatabase.changeUser(data, uid)
                    break;
                case 'DELETE' :
                    result = usersDatabase.deleteUser(uid)
                    break;
            }

            res.writeHead(result.status, {
                'Content-Type': 'application/json',
            });
            res.statusCode = result.status;
            res.end(JSON.stringify(result.data));
        })
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Invalid endpoint'}))
    }


})

server.listen(PORT, () => {
    console.log('Server started on port ', PORT);
})
