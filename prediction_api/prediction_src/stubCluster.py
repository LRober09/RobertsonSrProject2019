import sys, json

# session is a python dictionary
session = json.loads(sys.argv[1])

with open('prediction_src/lastSession.json', 'w+') as out_file:
    json.dump(session, out_file, sort_keys=True, indent=4)

result = {
    "nextIntent": "change_password",
    "confidence": 0.831,
}

print(json.dumps(result))


