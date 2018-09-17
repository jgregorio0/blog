#execute as admin

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
      v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/home/vagrant/project", "1"]
  end
  config.vm.define "nodejs" do |nodejs|
    nodejs.vm.box = "ubuntu/xenial64"
    nodejs.vm.host_name = "nodejs"
    nodejs.vm.network "forwarded_port", guest: 3000, host: 3000
    nodejs.vm.network "forwarded_port", guest: 5000, host: 5000
    nodejs.vm.synced_folder ".", "/home/vagrant/project"
    #mount_options:['nolock,vers=3,udp,noatime,actimeo=1']

    nodejs.vm.provision :shell, :path => "provision.sh"
  end
end
