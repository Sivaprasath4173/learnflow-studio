import requests
API='http://127.0.0.1:8001'
r=requests.get(API+'/courses/published')
print('published status', r.status_code)
if r.status_code==200:
    data=r.json()
    print('count', len(data))
    if data:
        cid=data[0]['id']
        print('sample id',cid)
        rc=requests.get(API+f'/courses/{cid}')
        print('get course status', rc.status_code)
        import json
        print(json.dumps(rc.json(), indent=2))
else:
    print('failed', r.text)
