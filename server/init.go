package main

import (
	"context"
	"log"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

type foot struct {
	Toes int64 `firestore:"toes,omitempty"`
	Hair bool	 `firestore:"hair"`
}

func main() {
	// not in google cloud way
	sa := option.WithCredentialsFile("./ServiceAccountKey.json")
	client, err := firebase.NewApp(context.Background(), nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	// ex using firestore
	firestoreClient, err := client.Firestore(context.Background())
	f := foot{Toes: 7, Hair: true}
	result, err := firestoreClient.Collection("feet").Doc("foot").Set(context.Background(), f)

	if err != nil {
		log.Fatalln(err)
	}

	log.Print(result)
	// defer client.Close()

	// Google cloud hosted
	// https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-go-service
	// conf:= &firebase.Config{ProjectID: projectID}
	// app, err := firebase.NewApp(context.Background(), conf)
}
