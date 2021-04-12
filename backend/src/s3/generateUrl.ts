import { S3 } from 'aws-sdk'

export const generateUrl = (todoId: string) => {
  const s3 = new S3({
    signatureVersion: 'v4'
  })

  const bucketName = process.env.TODOS_BUCKET_NAME
  const urlExpiration = process.env.SIGNED_URL_EXPIRATION

  return s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: todoId,
      Expires: urlExpiration
  })
}
