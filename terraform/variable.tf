# variable "aws_key_pair" {
#     default = "~/aws/aws_keys/default-ec2.pem"
# }

# We are using jenkins instead of our host machine
variable "aws_key_pair" {
    description = "The private key for accessing the EC2 instance"
    type = string
}